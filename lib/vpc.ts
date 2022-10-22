import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class VpcStack extends cdk.Stack {

  public readonly vpc: ec2.Vpc;
  public readonly publicSubnets: ec2.SelectedSubnets;
  public readonly privateSubnets: ec2.SelectedSubnets;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.vpc = new ec2.Vpc(this, 'WorkshopVpc', {
      vpcName: 'CqrsWorkshopVpc',
      cidr: '10.1.0.0/16',
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          name: 'private',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ]
    });

    this.publicSubnets = this.vpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC
    });
    
    this.privateSubnets = this.vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
    });
  }
}
