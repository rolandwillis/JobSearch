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
 

const collectCity = client.createStep({
  satisfied() {
    return Boolean(client.getConversationState().jobCity)
  },

  extractInfo() {

	const jobrole = firstOfEntityRole(client.getMessagePart(), 'jobrole') 

	  if (jobrole) {
      client.updateConversationState({
        jobRole: jobrole
      })
    console.log('User wants to search for the job role :', jobrole.value)
	}


    const city = firstOfEntityRole(client.getMessagePart(), 'city')

    if (city) {
      client.updateConversationState({
        jobCity: city
      })

      console.log('User wants the job search in:', city.value)
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
   return false;
  },
	  prompt() {
    // Need to provide job search link
let jobLinkMessage = {
        jobrole: client.getConversationState().jobRole.value,
		jobboardlink: "<a href='google.co.uk'>here</a>",
		jobcount:"3",
		city:client.getConversationState().jobCity.value,
      }
 client.addResponse('information_response/available_jobs', jobLinkMessage)
    client.done()
  }
})

const sayHello = client.createStep({
  satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('prompt/specify_jobtype')
     
      client.updateConversationState({
        helloSent: true
      })
      client.done()
  }
})

const sayGoodbye = client.createStep({
  satisfied() {
      return false;
    },

    prompt() {
      client.addResponse('thanks')
      client.done()
  }
})


  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
      'greeting':'hi',
   	  'information_request/available_jobs': 'getJobSearch',
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      main: 'hi',
	  hi:[sayHello],
	  getJobSearch:[collectCity,provideJobSearchLink],
	  end:[sayGoodbye]
    },
  })
}
