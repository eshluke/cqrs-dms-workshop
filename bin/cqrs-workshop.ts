#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Aurora as AuroraStack } from '../lib/aurora-snapshot';

const VPC_ID = '< REPLACE >';
const VPC_CIDR = '< REPLACE >';
const PRIVATE_SUBNET_IDS = ['< REPLACE >','< REPLACE >'];
const SOURCE_DB_SNAPSHOT_ARN = '< REPLACE >';

const app = new cdk.App();

const targetDbStack = new AuroraStack(app, 'TargetDbStack', { 
  description: "Workshop Target DB Stack",
  vpcId: VPC_ID,
  subnetIds: PRIVATE_SUBNET_IDS,
  dbName: "ws-target",
  engine: "mysql",
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.R6G,
    ec2.InstanceSize.LARGE
  ),
  ingressSources: [ec2.Peer.ipv4(VPC_CIDR)],
  auroraClusterUsername: 'admin',
  isDmsSource: true,
});

const sourceDbStack = new AuroraStack(app, 'SourceDbStack', { 
  description: "Workshop Source DB Stack",
  vpcId: VPC_ID,
  subnetIds: PRIVATE_SUBNET_IDS,
  dbName: "ws-source",
  engine: "mysql",
  mysqlEngineVersion: rds.AuroraMysqlEngineVersion.of('8.0.mysql_aurora.3.02.1', '8.0'),
  instanceType: ec2.InstanceType.of(
    ec2.InstanceClass.R6G,
    ec2.InstanceSize.LARGE
  ),
  ingressSources: [ec2.Peer.ipv4(VPC_CIDR)],
  auroraClusterUsername: 'admin',
  snapshot: SOURCE_DB_SNAPSHOT_ARN,
  isDmsSource: true,
});