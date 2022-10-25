import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface DmsStackProps extends cdk.StackProps {
  readonly sourceDbSecret: string;
  readonly targetDbSecret: string;
}

export class DmsStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: DmsStackProps) {
    super(scope, id, props);

    const instanceRole = new iam.Role(this, 'InstanceRole', {
      roleName: "dms-instance-role",
      assumedBy: new iam.CompositePrincipal(
          new iam.ServicePrincipal("dms.amazonaws.com"),
          new iam.ServicePrincipal("dms.ap-northeast-2.amazonaws.com"),
      ),
      inlinePolicies: {
        "allow-read-db-secrets": iam.PolicyDocument.fromJson({
          "Version": "2012-10-17",
          "Statement": [
            {
              "Sid": "VisualEditor0",
              "Effect": "Allow",
              "Action": [
                "secretsmanager:GetResourcePolicy",
                "secretsmanager:GetSecretValue",
                "secretsmanager:DescribeSecret",
                "secretsmanager:ListSecretVersionIds"
              ],
              "Resource": [
                props.sourceDbSecret,
                props.targetDbSecret
              ]
            },
            {
              "Sid": "VisualEditor1",
              "Effect": "Allow",
              "Action": [
                "secretsmanager:GetRandomPassword",
                "secretsmanager:ListSecrets"
              ],
              "Resource": "*"
            }
          ]
        })
      },
      description: 'for cqrs workshop dms instance',
    });

    new cdk.CfnOutput(this, 'OutputInstanceIamRoleArn', {
      exportName: 'InstanceIamRoleArn',
      value: instanceRole.roleArn,
    });
  }
}
