axios.get('https://daas-client-sandbox-wcnp.stg.walmart.com/client-center/v1/clients/11337/pickuppoints/external?category=PICKUP_POINT&activatedOnly=false&size=s',{headers:{"WM_CONSUMER.ID":"f9a5e1b6-189e-416b-9b04-f02cd5255932","WM_QOS.CORRELATION_ID":"23232","Content-Type":"application/json","WM_SVC.NAME":"CLIENT-SERVICES","WM_SVC.ENV":"sandbox:1.0.0"}})
	.then(res=>res)
	.catch(err=>console.log(err))
	




	   fetch( 
		'https://daas-client-sandbox-wcnp.stg.walmart.com/client-center/v1/clients/11337/pickuppoints/external?category=PICKUP_POINT&activatedOnly=false&size=s', 
		{headers:{"WM_CONSUMER.ID":"f9a5e1b6-189e-416b-9b04-f02cd5255932","WM_QOS.CORRELATION_ID":"23232","Content-Type":"application/json","WM_SVC.NAME":"CLIENT-SERVICES","WM_SVC.ENV":"sandbox:1.0.0"},
		body:"{\"parentPickupPointExternalId\":\"DEFAULT\",\"externalId\": \"4969\"}`",
		method:'POST'}
	   )
	   .then(res=>res)
	   .catch(err=>console.log(err))
	   
	   

		fetch( 
		'https://daas-client-sandbox-wcnp.stg.walmart.com/client-center/v1/clients/11337/pickuppoints/external?category=PICKUP_POINT&activatedOnly=false&size=s', 
		{headers:{"WM_CONSUMER.ID":"f9a5e1b6-189e-416b-9b04-f02cd5255932","WM_QOS.CORRELATION_ID":"23232","Content-Type":"application/json","WM_SVC.NAME":"CLIENT-SERVICES","WM_SVC.ENV":"sandbox:1.0.0"},
		method:'GET'}
		)
		.then(res=>res)
		.catch(err=>console.log(err))
		
 

 
`curl --location --request POST 'https://daas-client-sandbox-wcnp.stg.walmart.com/client-center/v1/clients/11337/pickuppoints/external?category=PICKUP_POINT&activatedOnly=false&size=s' \
--header 'WM_CONSUMER.ID: f9a5e1b6-189e-416b-9b04-f02cd5255932' \
--header 'WM_QOS.CORRELATION_ID: 23232' \
--header 'Content-Type: application/json' \
--header 'WM_SVC.NAME: CLIENT-SERVICES' \
--header 'WM_SVC.ENV: sandbox:1.0.0' \
--data-raw '{"parentPickupPointExternalId":"DEFAULT","externalId": "4969"}'`


 

   setHeaderConfig()
   //headerConfig()
  const headerConfig={}
bulkUploadConfig
   //TODO
   setBulkUploadConfig