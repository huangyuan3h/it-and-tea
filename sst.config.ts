import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

const certArn =
  "arn:aws:acm:us-east-1:319653899185:certificate/dde24c52-09e4-4058-b1d0-2a7769f24e3a";

export default {
  config(_input) {
    return {
      name: "dtc-fe",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const customDomain = {
        domainName: "www.it-t.xyz",
        isExternalDomain: true,
        cdk: {
          certificate: Certificate.fromCertificateArn(stack, "MyCert", certArn),
        },
      };

      const site = new NextjsSite(stack, "site", {
        customDomain: stack.stage === "production" ? customDomain : undefined,
        environment: {
          NEXT_PUBLIC_BACKEND_API: process.env.NEXT_PUBLIC_BACKEND_API ?? "",
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
