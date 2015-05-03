# lambda-zip
AWS Lambda  used to create system integration that responde to events in your infrastructure

In this sample, we receive a ZIP file in a S3 bucket that is going to trigger a Lambda function.
This function is going to get the ZIP file, extract the files and put them in another bucket unziped.

The next step on this project is to extract the data from the files and put them into the DynamoDB or Redshift and send a notification to monitor the operation.

Thank's!

===========================
Steps

1) Download files
2) Create Lambda function
3) Define event trigger
	- Permission's
4) Test

Advantages

- Paralelism - Each file have their own Lambda container
- No server at all, zero problems to maintain or to keep HA
- Very low cost
- High security 
- Event driven
- FTP no more

