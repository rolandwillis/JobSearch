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
  const sayHello = client.createStep({
    satisfied() {
      return Boolean(client.getConversationState().helloSent)
    },

    prompt() {
      client.addResponse('welcome')
     /* client.addResponse('provide/documentation', {
        documentation_link: 'http://docs.init.ai',
      })
      client.addResponse('provide/instructions')
	*/
      client.updateConversationState({
        helloSent: true
      })

      client.done()
    }
  })

  const untrained = client.createStep({
    satisfied() {
      return false
    },

    prompt() {
      client.addResponse('apology/untrained')
      client.done()
    }
  })

const collectCity = client.createStep({
  satisfied() {
    return Boolean(client.getConversationState().city)
  },

  extractInfo() {

	const jobrole = firstOfEntityRole(client.getMessagePart(), 'jobrole') 

	  if (jobrole) {
      client.updateConversationState({
        jobrole: jobrole.value
      })
    console.log('User wants to search for the job role :', jobrole.value)
	}


    const city = firstOfEntityRole(client.getMessagePart(), 'city')

    if (city) {
      client.updateConversationState({
        city: city.value
      })

      console.log('User wants the job search in:', city.value)
    }
  },

  prompt() {
    client.addResponse('app:response:name:prompt/specify_city', {
        jobrole: client.getConversationState().jobrole
      })
    client.done()
  },
})

const provideJobSearchLink = client.createStep({
  satisfied() {
   return false;
  },
	extractInfo(){
    const jobboardlink = "<a href='google.co.uk'>here</a>"


    if (jobboardlink) {
      client.updateConversationState({
        jobboardlink: jobboardlink
      })

      //console.log('User wants the job search in:', city.value)
    }
}
,
  prompt() {
    // Need to provide job search link
 client.addResponse('app:response:name:information_response/available_jobs', {
        jobrole: client.getConversationState().jobrole,
		jobboardlink: client.getConversationState().jobboardlink,
		jobcount:3,
		city:client.getConversationState().city
      })
    client.done()
  },
})

  client.runFlow({
    classifications: {
      // map inbound message classifications to names of streams
    },
    autoResponses: {
      // configure responses to be automatically sent as predicted by the machine learning model
    },
    streams: {
      main: 'getJobSearch',
      hi: [sayHello],
      end: [untrained],
	  getJobSearch:[collectCity,provideJobSearchLink]
    },
  })
}
