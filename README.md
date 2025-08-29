# EmergencyServiceDirectory



**#A project to create a directory of emergency services for Bangladesh. The website allows users to access emergency hotline numbers and call them directly with a single click.**



**1.What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?**

getElementById returns a single element with the specified id.

getElementsByClassName returns a live HTMLCollection of elements with the specified class name.

querySelector returns the first element matching the specified CSS selector.



**2.How do you create and insert a new element into the DOM?**

Use document.createElement("tagName") to create the new element.

Set its properties (e.g., textContent, classList.add()) as needed.

Append it to an existing element using parentElement.appendChild(newElement).



**3.What is Event Bubbling and how does it work**?

Event bubbling is when an event triggered on a child element propagates upward to the parent elements.



**4.What is Event Delegation in JavaScript? Why is it useful?
**
Event delegation is the practice of adding a single event listener to a parent element rather than multiple listeners to individual child elements. It works because events bubble up to the parent, allowing the parent to handle the events of its children. This is useful for performance and managing dynamic content.


**5.What is the difference between preventDefault() and stopPropagation() methods?**

preventDefault() stops the default action associated with an event (e.g., prevents form submission or hyperlink navigation).

stopPropagation() prevents the event from propagating (bubbling up) to parent elements, stopping any parent event listeners from being triggered.

**END**

