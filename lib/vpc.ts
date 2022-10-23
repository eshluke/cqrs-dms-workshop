import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface VpcStackProps extends cdk.StackProps {
  
  /**
   * the name of the VPC
   *
   * @type {string}
   * @memberof VpcStackProps
   */
  readonly vpcName: string;
}

export class VpcStack extends cdk.Stack {

  public readonly vpc: ec2.IVpc;
  public readonly publicSubnets: ec2.SelectedSubnets;
  public readonly privateSubnets: ec2.SelectedSubnets;

  constructor(scope: Construct, id: string, props: VpcStackProps) {
    super(scope, id, props);

    this.vpc = ec2.Vpc.fromLookup(this, 'ProjectVpc', {
      vpcName: props.vpcName,
    });

    this.publicSubnets = this.vpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC
    });
    
    this.privateSubnets = this.vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
    });

    new cdk.CfnOutput(this, 'VpcId', {
      exportName: 'VpcId',
      value: this.vpc.vpcId,
    });
    new cdk.CfnOutput(this, 'PrivateSubnets', {
      exportName: 'PrivateSubnetIds',
      value: this.privateSubnets.subnetIds.join(','),
    });
    new cdk.CfnOutput(this, 'PublicSubnets', {
      exportName: 'PublicSubnetIds',
      value: this.publicSubnets.subnetIds.join(','),
    });
  }
}
