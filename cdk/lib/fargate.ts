import * as cdk from "aws-cdk-lib";
import {CfnOutput, Fn} from "aws-cdk-lib";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import {InstanceClass, InstanceSize} from "aws-cdk-lib/aws-ec2";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import {Construct} from 'constructs';
import {ApplicationProtocol} from "aws-cdk-lib/aws-elasticloadbalancingv2";

export interface FargateStackProps extends cdk.StackProps {
  readonly vpcId: string;
}

export class FargateStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: FargateStackProps) {
    super(scope, id, props);

    let bootstrapServers = new cdk.CfnParameter(this, "bootstrapServers", {
      type: "String",
      description: "Bootstrap address for Kafka brokers."
    });

    let zookeeperAddresses = new cdk.CfnParameter(this, "zookeeperAddresses", {
      type: "String",
      description: "Bootstrap address for ZooKeeper servers."
    });

    const vpc = ec2.Vpc.fromVpcAttributes(this, 'ExistingVPC', {
      vpcId: props.vpcId,
      availabilityZones: Fn.getAzs(),
    });

    const cluster = new ecs.Cluster(this, 'Cluster', {
      vpc,
    });

    cluster.addCapacity('DefaultAutoScalingGroupCapacity', {
      instanceType: ec2.InstanceType.of(InstanceClass.T3, InstanceSize.LARGE),
      desiredCapacity: 1,
    });

    const kafkaUiService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster, // Required
      cpu: 512, // Default is 256
      memoryLimitMiB: 2048, // Default is 512
      desiredCount: 1, // Default is 1
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry("provectuslabs/kafka-ui"),
        containerPort: 8080,
        environment: {
          'KAFKA_CLUSTERS_0_NAME': 'cqrs-cluster',
          'KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS': bootstrapServers.valueAsString,
          'KAFKA_CLUSTERS_0_ZOOKEEPER': zookeeperAddresses.valueAsString,
        }
      },
      publicLoadBalancer: true, // Default is true
      loadBalancerName: 'cqrs-dms',
      openListener: true,
      listenerPort: 8080,
      protocol: ApplicationProtocol.HTTP,
      targetProtocol: ApplicationProtocol.HTTP,
    });
  }
}
