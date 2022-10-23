#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { VpcStack } from '../lib/vpc';
import { Aurora as AuroraStack } from '../lib/aurora-snapshot';

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'VpcStack');

const targetDbStack = new AuroraStack(app, 'TargetDbStack', { 
  description: "Workshop Target DB Stack",
  vpcId: vpcStack.vpc.vpcId,
  subnetIds: vpcStack.privateSubnets.subnetIds,
  dbName: "ws-target",
  engine: "mysql",
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.R6G,
    ec2.InstanceSize.LARGE
  ),
  ingressSources: [ec2.Peer.ipv4(vpcStack.vpc.vpcCidrBlock)],
  auroraClusterUsername: 'admin'
});

const sourceDbStack = new AuroraStack(app, 'SourceDbStack', { 
  description: "Workshop Source DB Stack",
  vpcId: vpcStack.vpc.vpcId,
  subnetIds: vpcStack.privateSubnets.subnetIds,
  dbName: "ws-source",
  engine: "mysql",
  mysqlEngineVersion: rds.AuroraMysqlEngineVersion.of('8.0.mysql_aurora.3.02.1', '8.0'),
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.R6G,
    ec2.InstanceSize.LARGE
  ),
  ingressSources: [ec2.Peer.ipv4(vpcStack.vpc.vpcCidrBlock)],
  auroraClusterUsername: 'admin',
  snapshot: '< SNAPSHOT_ARN >', // TODO: replace!!!!
  isDmsSource: true,
});