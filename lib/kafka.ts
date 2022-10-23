import * as cdk from 'aws-cdk-lib';
import * as msk from 'aws-cdk-lib/aws-msk';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface KafkaStackProps extends cdk.StackProps {
  readonly vpcId: string;
  readonly vpcCidr: string;
  readonly privateSubnetIds: string[];
}

export class KafkaStack extends cdk.Stack {
  public kafkaCluster: msk.CfnCluster;

  constructor(scope: Construct, id: string, props: KafkaStackProps) {
    super(scope, id, props);

    const VERSION = '2.8.1';
    const kafkaConfiguration = this.createKafkaConfiguration(VERSION);

    const kafkaSecurityGroup = this.createKafkaSecurityGroup(props.vpcId, props.vpcCidr);
  

    this.kafkaCluster = new msk.CfnCluster(this, "kafkaCluster", {
      brokerNodeGroupInfo: {
        clientSubnets: props.privateSubnetIds,
        instanceType: "kafka.m5.large",
        securityGroups: [kafkaSecurityGroup.securityGroupId],
        storageInfo: {
          ebsStorageInfo: {
            provisionedThroughput: {
              enabled: false,
              volumeThroughput: 123,
            },
            volumeSize: 100,
          },
        },
      },
      clusterName: "ProjectKafkaCluster",
      kafkaVersion: VERSION,
      numberOfBrokerNodes: 2,
      configurationInfo: {
        arn: kafkaConfiguration.attrArn,
        revision: 1,
      },
      enhancedMonitoring: 'PER_TOPIC_PER_BROKER',
    });
  }

  createKafkaConfiguration(version: string): msk.CfnConfiguration {
    const serverProperties = `
    auto.create.topics.enable=true
    delete.topic.enable=true
    default.replication.factor=2
    min.insync.replicas=1
    `;

    return new msk.CfnConfiguration(this, 'MyCfnConfiguration', {
      name: 'ProjectKafkaClusterConfig',
      serverProperties: Buffer.from(serverProperties, 'binary').toString('base64'),
      // the properties below are optional
      description: 'initial config',
      kafkaVersionsList: [version],
    });
  }

  createKafkaSecurityGroup(vpcId: string, vpcCidr: string): ec2.SecurityGroup {
    const vpc = ec2.Vpc.fromVpcAttributes(this, 'ExistingVPC', {
      vpcId,
      availabilityZones: cdk.Fn.getAzs(),
    });

    const sg = new ec2.SecurityGroup(this, 'kafkaSecurityGroup', {
      securityGroupName: 'ProjectKafkaClusterSg',
      vpc,
      allowAllOutbound: true
    });

    sg.addIngressRule(ec2.Peer.ipv4(vpcCidr), ec2.Port.tcp(9092), 'Allow from VPC to brokers');
    sg.addIngressRule(ec2.Peer.ipv4(vpcCidr), ec2.Port.tcp(2181), 'Allow from VPC to zookeepers');

    return sg;
  }
}
