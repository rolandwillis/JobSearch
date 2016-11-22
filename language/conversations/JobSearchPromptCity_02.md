---
title: JobSearchPromptCity_02
timestamp: 2016-11-22T22:42:21.154877051Z
---

Hi
* greeting

< Hi, what type of job are you looking for?
* prompt/specify_jobtype

I am looking for [engineering](jobrole) jobs.
* information_request/available_jobs

< Where do you live?
* prompt/specify_city

I live in [London](city)
* response/specify_city

< I have [4](jobcount) [engineering](jobrole) jobs in [London](city). check [this](jobboardlink)
* information_response/available_jobs

Bye
* goodbye

< Bye for now.
* thanks
