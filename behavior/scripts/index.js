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

	let jobRole = {
        jobrole: client.getConversationState().jobrole.value
      }
    client.addResponse('app:response:name:prompt/specify_city', jobRole)
    client.done()
  },
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
		jobcount:3,
		city:client.getConversationState().jobCity.value,
      }
 client.addResponse('app:response:name:information_response/available_jobs', jobLinkMessage)
    client.done()
  }
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
	  getJobSearch:[collectCity,provideJobSearchLink],
    },
  })
}
