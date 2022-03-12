<div align="center">
  <p>
    <img src="https://dash.b-cdn.net/icons/menu/tap-en-logo.svg" width="300"/>
  </p>
  <p>
    <span style="font-weight:bold">Tap Payments</span> simplifies online payment & acceptance for businesses with an easy, quick & secure experience for people paying on websites & apps.
  </p>
  <small>
    <kbd >Made by Ahmed Elsharkawy</kbd>
    <br/>
    Full Stack Engineer
  </small>
</div>

# Take Home assessment (Frontend)

## Overview

This is a Take Home assessment for candidates applying for a Sr. frontend developer
position at Tap company. It contains two sections: "Frontend", "Follow-up" which
together include a series of tests involving HTML, CSS, JavaScript and reactJs.

Feel free to solve these questions however you see fit, using whatever coding
style or third-party libraries (material-ui/ant-design/...) you think are appropriate.

To start the test, simply clone this repo and make your edits locally.

## Frontend Part

For the frontend portion of the test, use the `/frontend` folder. There are 6 features we'd like to add:

1. Create a main page includes two section:

<ul>
  <li>user balance which is mean the current balance of the user and to get the user balance you can call <b>GET: </b><code>http:localhost:8000/api/balance</code></li>
  <li>Button which is named <code>Recharge/Add Balance</code> and this button should fire modal/popup if the user click on it</li>
</ul>

2. The modal/popup that fired by the button should include payment card
   component like <code>Card Name, Card number, Card expiry date, Card
   CVV</code> and you finally a button named <b>Charge 10$</b>.

<ul>
   <li><b>Hint:</b> You need to validate the credit card components and feel free to use any third-party libs.</li>
   <li><b>Hint:</b> You need to name the button like this <code>Charge 10$</code> cuz the amount should be fixed and the user can't add his amount.</li>
</ul>

3. Validate the card component and if the user enter a valid data enable the <code> Charge 10$</code> button

<ul>
   <li><b>Hint:</b> Show an error under the invalid card component field</li>
</ul>

4. You need to Submit using this api
   <b>POST:</b><code>http:localhost:8000/api/balance</code><br/>
   <b>body:</b>

   ```
   {
    amount:10
   }

   ```

<ul>
    <li><b>Hint:</b> After getting a success response show a success message or success image and wait 20s and close the modal/popup.</li>
    <li><b>Hint:</b> After closing modal/popup the user should see his new balance in the real-time without refreshing the page .</li>
</ul>

5. Use state management(Mobx/Redux) to handle the data in your app.
6. Use Typescript with webpack or use create-react-app.

NOTE: Please make the frontend app be served on port `:3000`.
<br>
NOTE: to run the backend you can run `docker-compose up --build` or go to the
server folder add run `npm i && npm run start`.

Feel free to structure the code however you prefer and use third-party libraries at your discretion.

Do not spend too much time on making it beautiful. Basic aesthetics are welcome, but we are not
grading your design skills here.

## Follow-up Part

Answer the questions in the [FOLLOW-UP.md](./FOLLOW-UP.md) file.

## Docker

The test contains a basic `docker-compose.yml` file. It uses the latest official NodeJS
Docker image and creates two containers - one for backend and one for frontend.

The respective folder is mounted in `/app` directory inside the container.

It isn't a requirement to use it, but may be convenient.

NOTE: We WILL run your code inside these containers.

## Submitting Your Code

Once you've completed the test, please compress your files (via zip or tar) and
and upload it on your drive then share the link with us over the mail `OR` push it to your public repo and share the link with us.

**Do not include node_modules or .git in your submission**

Once we receive it, a member of our team will review and we'll get back to you
as soon as possible.

Thanks!
