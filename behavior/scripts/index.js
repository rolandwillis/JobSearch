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
    return Boolean(client.getConversationState().jobSearchCity)
  },

  extractInfo() {

	const jobRole = firstOfEntityRole(client.getMessagePart(), 'JobRole') 

	  if (jobRole) {
      client.updateConversationState({
        JobRole: jobRole
      })

    console.log('User wants to search for the job role :', jobRole.value)

    const city = firstOfEntityRole(client.getMessagePart(), 'city')

    if (city) {
      client.updateConversationState({
        jobSearchCity: city,
      })

      console.log('User wants the job search in:', city.value)
    }
  },

  prompt() {
    client.addResponse('app:response:name:prompt/specify_city')
    client.done()
  },
})

const provideJobSearchLink = client.createStep({
  satisfied() {
    return false
  },

  prompt() {
    // Need to provide job search link
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
      main: 'hi',
      hi: [sayHello],
      end: [untrained],
	  getJobSearch:[collectCity,provideJobSearchLink]
    },
  })
}
