# Presenting

Congratulations on finishing your full stack project! The only thing left to do is prepare to speak about your project.

## Context

Completing your largest project is an exciting time 🎉. Without upfront certainty, you took on tasks and committed to completing them. You no doubt learned a lot before starting your project, but as most projects tend to go, you probably learned _even more_! There is so much to be said about a project you've built that it can be tricky to pick focal points when presenting it.

This guide aims to give you a framework for presenting your work.

## Audience

The first thing to keep in mind when preparing your presentation is your audience. Who are you presenting to? This guide assumes that you are giving a technical presentation to technical people. These people include:

- Other Developers
- Technical Interviewers
- Hiring Managers

Be very careful not to mistake a technical presentation for a ~~business pitch~~ or even a ~~product demo~~. You will notice that this guide actually _deprioritizes demonstration_ in favor of **highlighting technical choices** that you made while building your project. This is because the entire purpose of your project was to solidify your knowledge and skills as a developer.

Even if you believe that things you've done are obvious in hindsight or obvious to an experienced technologist, don't forget: you are trying to demonstrate that you were **able to wield technology to accomplish a goal**. Instead of trying to impress people with the scale or sophistication of your accomplishments (which may be small), focus on **articulating your understanding**.

Hiring new developers is very risky to potential employers. One thing that they are looking for in a candidate is their ability to learn and apply what they've learned. An excellent way to demonstrate your learning to somebody is to explain it. Fortunately, your project has given you a plethora of stories that you can tell.

## Preparation

Being prepared to speak about your work takes time. It is recommended that you and your team budget 2-3 hours of time to get ready.

1. Reflect on your **personal** experience. Ask yourself the following question: What part(s) of the project did I work on or help with? **You should have a list of answers ready. BE SPECIFIC!** For example:

    - I worked on the back end for the feature "User can ..."
    - I worked on the front end for the feature "User can ..."
    - I fixed a front end or back end bug where `x` was happening because `y` was incorrect, so I fixed it by doing `z`.
    - My team faced collaboration challenge `x` so we agreed to `y` and the results were `z`.
    - My favorite (technical) part of the project was `x`. I didn't know about `y`, but then I learned `z`.
    - My teammate ran into a problem with `x`, so together we figured out `y` and decided to `z`.

    This list should be many items long; small and large. **Shoot for 10, but 5 is okay.** Write them down. Use "I" over "we" where truthful and favor stories that use "I". It's a good idea to mention research you conducted as well. You'll be presenting _one_ of these, but give yourself options.

1. Pick one feature (or bug) that you worked on and trace through _all_ of the code for that feature (or bug 😉), including the front end event handler functions, the resulting state changes and API call(s), the back end endpoint(s) and the database table(s). For example:

     > When the user submits this form, it fires an event listener that will validate the form's fields. If they are valid, then a request is made to this back end endpoint. The endpoint validates the data from the client and then sends this SQL query to this database table before responding. When the front end receives the response, this is how the state is updated and the user interface changes.

    Jot down file names, method names, and line numbers in the order that they should be visited during the trace. Go through the motions of explaining the code to one of your classmates. **Remember not to rush**. You may feel nervous when talking about code, but it's _much_ safer to **assume that your audience is not highly skilled at spot-reading code**. If time allows, do this for every feature of the project.

1. Rehearse your presentation. If you have followed the first two steps, you will have notes that support at least 5-10 minutes of individual talking. If you are presenting in a group, then plan on your presentation taking about 15-20 minutes, excluding questions from the audience. You and your team should work together to tighten your presentation so that it hits the 15-20 minute mark. This means **actually** practicing your presentation.

## LearningFuze Final Project Presentations

Each final project group should prepare to spend roughly 25 minutes presenting to the rest of their classmates. This 25 minutes includes a few minutes of "Q & A" at the end of the presentation.

The presentation flow should follow this structure:

1. Team Lead introduces the project as "A &mdash; for &mdash; who want to &mdash;" and only shows the home screen of the project. **DO NOT DEMONSTRATE THE FUNCTIONALITY YET**.
1. For each Team Member until 15-20 minutes has passed do the following. Team Lead goes last:
    1. Team Member introduces themself and their primary role(s).
    1. Team Member explains one feature (User can...) or some technical dimension of the project that excited them.
    1. Team Member traces the code for that feature in front of the audience. If Team Member is not speaking about a specific feature, they should be prepared to explain the topic in detail by pointing to code samples in the project.
    1. Team Member **briefly demonstrates** the functionality of the feature as a user.
1. Take questions from the audience after everyone has presented.

### Tips

1. Plan on using **one** laptop for presentation and make sure that everyone on the team is able to use it. Test the laptop on the target A/V system (projector, sound, etc). Do this hours ahead of presenting.
1. Plan on using a legible font and code editor theme. Your presentation will be very code-heavy, so be sure that the audience members at the back of the room will be able to see the code clearly. Avoid fancy ligatures while showing code to others.
1. REHEARSE! Don't just wing it. It's obvious when you do this.
1. When presenting to a room of people, don't be afraid to refer to bullet points on note cards or your phone to keep you on track.
