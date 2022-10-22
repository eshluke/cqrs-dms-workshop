#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { VpcStack } from '../lib/vpc';
import { Aurora as AuroraStack } from '../lib/aurora';

const app = new cdk.App();

const vpcStack = new VpcStack(app, 'VpcStack');

const sinkDbStack = new AuroraStack(app, 'SinkDbStack', { 
  description: "Workshop Sink DB Stack",
  vpcId: vpcStack.vpc.vpcId,
  subnetIds: vpcStack.privateSubnets.subnetIds,
  dbName: "ws-sink",
  engine: "mysql",
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.R6G,
    ec2.InstanceSize.LARGE
  ),
  ingressSources: [ec2.Peer.ipv4(vpcStack.vpc.vpcCidrBlock)],
  auroraClusterUsername: 'admin'
});