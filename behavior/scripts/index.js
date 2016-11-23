'use strict'

const firstOfEntityRole = function(message, entity, role) {
  role = role || 'generic';

  const slots = message.slots
  const entityValues = message.slots[entity]
  const valsForRole = entityValues ? entityValues.values_by_role[role] : null

  return valsForRole ? valsForRole[0] : null
}

exports.handle = (client) => {
  // Create steps
 
const establishJobType = client.createStep({
  satisfied() {
      return Boolean(client.getConversationState().jobRole)
    },
	extractInfo(){

 const jobrole = firstOfEntityRole(client.getMessagePart(), 'jobrole')
	if(jobrole)    
	{  
	if(jobrole.value=="anything"){
		jobrole.value = "any"
	}
	client.updateConversationState({
		    jobRole: jobrole
		  })
	  console.log('User specifies interest in jobs of role type:', jobrole.value)
	}
},
    prompt() {
      client.addResponse('prompt/specify_jobtype')
    
      client.done()
  }
})

const collectCity = client.createStep({
  satisfied() {
    return Boolean(client.getConversationState().jobCity)
  },

  extractInfo() {
	console.log('trying to get information about the job role inside collectCity.')
	const jobrole = client.getConversationState().jobRole

	  if (jobrole) {
      client.updateConversationState({
        jobRole: jobrole,
		byeSent:false
      })
    console.log('User wants to search for the job role inside collectCity :', jobrole.value)
	}

	console.log('trying to get information about the job city inside collectCity.')
    const city = firstOfEntityRole(client.getMessagePart(), 'city')

    if (city) {
      client.updateConversationState({
        jobCity: city,
		byeSent:false
      })

     console.log('User wants to search for the job role ' + jobrole.value + ' near the city :', city.value)
    }
  },

  prompt() {

	let jobrole = {
        jobrole: client.getConversationState().jobRole.value
      }
    client.addResponse('prompt/specify_city', jobrole)
    client.done()
  }
})


const provideJobSearchLink = client.createStep({
  satisfied() {

     return Boolean(client.getConversationState().jobLinkSent)
  },
	  prompt() {
    // Need to provide job search link
let jobLinkMessage = {
        jobrole: client.getConversationState().jobRole.value=="any"?"":client.getConversationState().jobRole.value,
		jobboardlink: "http://google.co.uk",
		jobcount:"3",
		city:client.getConversationState().jobCity.value
      }
 client.addResponse('information_response/available_jobs', jobLinkMessage)
	client.updateConversationState({
		    jobLinkSent: true
		  })
    client.done()
  }
})



const sayGoodbye = client.createStep({
  satisfied() {
    return false
    },

    prompt() {
      client.addResponse('thanks')
// Reset all satisfied conditions
 client.updateConversationState({
        jobLinkSent: false,
		jobRole:null,
		jobCity:null,
		byeSent:true
      })
      client.done()
  }
})


  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
    //  'greeting':'hi',
	//  'information_response/available_jobs':'getJobSearchLink'
	'goodbye':'end'
	 
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      main: 'hi',
	
	  hi:[establishJobType,collectCity,provideJobSearchLink],
	  end:[sayGoodbye]
    },
  })
}
