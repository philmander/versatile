## A short guide to Example Mapping

If you're part of a software engineering team you'll no doubt be involved in various ceremonies and sessions throughout the week. Such sessions usually have some kind of output, whether it be actions and experiments for retrospectives or stories and point estimations following a refinement.

Where this is the case it's also a good idea to use various techniques to help structure the session. This is often lacking in refinement sessions other than things like "planning poker" for estimating. What should the output be of a refinement session really be and what techniques can support the process?

Enter **Example Mapping**. Example Mapping is a technique teams use to break a big unit of work into smaller ones - often called story slicing. Example Mapping can slot right into a typical scrum team to help define stories and define agreeable estimations. But if a software engineering team identifies itself as being more aligned with Extreme Programming, lean and behavior-driven principles, it really shines and is a must have addition to your agile toolbox.

Therefore, for a team or org wishing to mature their engineering practices, Example Mapping is a great gateway drug!

### More reasons to practice Example Mapping

Lot's of reasons:

* It's a great proof of knowledge-transfer from the PM/PO/customer to the implementation team. By writing down and discussing our interpretation of the requirements, a shared understanding of the work is created.
* It also creates a shared understanding of the work to be done in terms of outcomes and value, engaging the development team in defining the "what" and the “why”, not just the "how".
* Likewise, teams explicitly make it clear what they don't understand and align on that too
* It helps to prioritize the work items in line with the ideal value curve via smaller slices of work, more focus and shorter feedback loops.
* Example Mapping flows seamlessly into defining acceptance criteria with Gherkin (Given/When/Then)
* The resulting work breakdown and the granularity of examples helps provide a better platform for estimation (if you need that).

### How does it work?

In a nutshell:

* The team defines a set of "rules" to encompass their understanding of the capability to be developed.
* For each rule the team defines a set "examples" that apply to that rule.
* Throughout the process the priority of rules can be updated.
* Rules which seem to have to many examples can be split into more rules
* Finally, rules can be grouped into stories.

### A Worked Example

The [Elephant Carpaccio workshop](https://alistair.cockburn.us/wp-content/uploads/2018/02/Elephant-Carpaccio-exercise-instructions.pdf) is an exercise to get teams thinking about story slicing and more frequent delivery and feedback loops. In less than 2 hours small workshop teams must analyze the requirements, create a backlog of 15-20 value-aligned stories and then implement them in 5 eight minute sprints. The objective is to build a simple calculator that computes a price for a given number of items including tax and volume buying discounts:

IMAGE workshop.png

I ran this workshop recently with one of the teams at Harver and as a follow up we used these requirements to practice Example Mapping. Here's how it went:

#### Preparation

Nowadays, I highly recommend using a digital whiteboard to enable the session; if remote or even physically together. Here at Harver we use Miro and Jira. The ability to convert the resulting story stickies directly to Jira tickets is a really nice touch. Also Miro's timing tools really help to time-box the session and its sub parts.

A dedicated facilitator is great, particularly when learning how to Example Map, but I'd advise teams learn to facilitate themselves to reduce dependencies to get stuff done.

#### Step 1: Define the big story

IMAGE step-1

Whoever who has the domain knowledge of the requirements should explain and communicate those to the team, without being particularly concerned about their structure. This is typically a Product Manager (PM), Product Owner (PO) or maybe even the customer directly. For convenience I’ll continue to refer to this person as the “PM”.

In the Elephant Carpaccio exercise the requirements explain a need to calculate discounts and tax rates on items to be purchased. Concerns about "scope" and "priority" and not relevant here.

Create one sticky to represent this "story" (you might also be familiar referring to this as an "Epic").

#### Step 2: Define the rules

IMAGE step-2

The team brainstorms the "rules" of the new capability, derived from the requirements: what the system should do. We use a time-boxed, silent brainstorming technique to create a big bag of rules, using blue stickies. Those in the team who will be responsible for the implementation should directly contribute, the PM should observe and be on hand to answer questions.

The facilitator should review the rules, asking for clarification where needed, and then deduplicate them. Use the Do's and Don'ts below to critique and refine the rules. The PM should validate that the rules, at least, encompass the complete scope of the requirements.

Throughout this process, particularly during the brainstorming parts, anyone can ask a question using a red sticky. It's not unusual in a typical refinement session that the team can go down a rabbit hole, spending 50% of the time on 5% of content. If a question is not instantly answerable, we should be conscious of this and take time to answer the question outside of this session.

The output should a horizontal list of blue stickies and possibly some red stickies, somewhere too.

#### Step 3: First prioritization pass

IMAGE step 3

Ask the question: if you could only deliver one rule, which one would it be? Follow this through until the horizontal list of rules is in a prioritized order. Again, no need to worry about "scope", just priority.

Aim to prioritize rules in a way which creates a value curve where value is delivered frequently and therefore, feedback can be obtained early and often.

IMAGE step 3-2

The output is a a row of blue stickies in a prioritized order.

#### Step 4: Define Examples

In a similar way to brainstorming the rules. for the first rule in the row, brainstorm Examples using green stickies. The facilitator should arrange these in a column below the relevant rule. Don't be afraid to create very specific examples; specific realizations of a rule. If it helps, use Given/When/Then to casually structure the example; think about the variable inputs and outputs for a given rule and substitute those with specific values. Such values are often infinite in nature, so try to pick out a handful of representative ones.

Do this initially just for the first few rules. Attempting to exhaust examples for all rules, will likely mean prematurely thinking in too much detail for later rules, prolonging the session and resulting in Example Mapping fatigue!

The output is a column of green stickies under each relevant rule.

#### Step 5: Break apart the rules and reprioritize

IMAGE step 5

For a given rule there may be many examples. Ask the team if these examples should be split apart into multiple rules. Given that one rule is divided in two, it may be that the first rule remains high priority, but the second is not as important. So at this point, we can reprioritize the second rule moving the order of the blue sticky horizontally and, in turn, its column of examples.


#### Step 6: Define stories
IMAGE step 6 

Once you have a list of rules, it's a finishing touch to group them into the more familiar user stories. In a mature team who can continually iterate through delivering the examples, this might seem a little pointless, so can be seen as optional. However, it is a good way to define some milestones with the scope of the work that are more friendly to some stakeholders. They may also define value in blocks that directly can be delivered to end users; as opposed to internal value through frequent feedback.

The output is a row of yellow stickies above the row of rules. This is the story backlog.

### Do's and Don'ts

Don't worry about scope. Adopt a "no bad ideas" approach to brainstorming, you don't have to commit to whether you will build something or not this early in the development lifecycle. Just prioritize accordingly

Don't use visual designs to drive requirements. This a common trap. The rules and examples created in the session should drive the designs also, not the other way around. Look for red flags in descriptions that talk about clicking buttons or viewing pages.

Do involve designers, QA specialists and anyone contributing to the implementation in the session.

Do write specific examples. This can surprisingly difficult. Engineers tend to naturally think in generalized ways and it takes some discipline to write good examples.

Don't expect to define all Examples in one session. Do enough so you can break down and reprioritize the few first few rules, but doing too much will take too long and fatigue the team. Lower prioritized rules will undoubtably change by the time you get to build them.

Do the session immediately before implementation work on the first story/example can begin. Doing the session and letting it sit for days and weeks will create context switching, destroy momentum. The requirements will become stale.

Do expect the Example Map to evolve over time and for new rules and examples to emerge as development continues.

### What next?

The next step for a team using Example Mapping is to get building! As I alluded to further up, a scrum team can reap the benefits of using the technique to define their story backlog and support estimations, and then, populate sprints and get developing as usual.

The beauty of Example Mapping for me though is that it is a starting point for a more behavior-driven (BDD) and lean approach to software development. Its output is a precursor and foundation for XP values, such as feedback and communication, and practices like simple-design, refactoring, continuous delivery and small releases. Lean development teams can focus example by example, building up generality by continuously getting feedback, refactoring and delivering simple units of work.

As you develop example by example, it’s a good idea to define acceptance criteria using Gherkin (whether you intend to run with Cucumber or not). A positive side-effect of working this way is that the team gains a sense of momentum through frequent mini-wins of delivering Examples. But without a consensus of what it means to complete an Example this can be unclear.

The latest syntax of Gherkin maps directly from Example Mapping:

what-next

Thanks to

Matt Wynne for creating this technique

Wim Heemskerk for introducing me to Example Mapping 4 years ago.