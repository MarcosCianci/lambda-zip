# lambda-zip
AWS Lambda  used to create system integration that responde to events in your infrastructure

In this sample, we receive a ZIP file in a S3 bucket that is going to trigger a Lambda function.
This function is going to get the ZIP file, extract the files and put them in another bucket unziped.

The next step on this project is to extract the data from the files and put them into the DynamoDB or Redshift and send a notification to monitor the operation.

Thank's!


===========================
Passo a passo:

1) Baixar arquivos
2) Criar função Lambda
3) Definir o evento da função
	- Dar as permisões na role
4) Testar


Vantagens

- Paralelismo
- Não usar servidor, portanto  a chance de dar problemas reduz drasticamente
- Baixíssimo custo
- Alta segurança
- Orientada a eventos
- FTP nunca mais!


