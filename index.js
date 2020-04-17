const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

// const licenses = require("./licenses");

// const util = require("util"); //MAY NOT NEED THIS ONE
 

//WILL REFER TO THESE INPUTS AS ANSWERS IN A LATER FUNCTION
inquirer
  .prompt([ {
    type: "input",
    name: "fileName",
    message: "What should this README file's name be? \n(Invalid characters: \ / : * ? &quot; &lt; &gt; |) \n(Example: typing in my name, Kiana, names the file KianaREADME.md)"
 
    //NEED TO REMEMBER TO LET USER CHANGE README FILE NAME
  },
  {
    type: "input",
    name: "user",
    message: "Enter your GitHub username: "
  },
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?"
  },
  {
    type: "input",
    name: "desc",
    message: "Write a description of your project."
  },
  {
    type: "input",
    name: "install",
    message: "What are your project's installation requirements?"
  },
  {
    type: "input",
    name: "usage",
    message: "What is your project's usage type?"
  },
  {
    type: "input",
    name: "license",
    message: "What is your project's licensing?"
  },
  {
    type: "input",
    name: "contributors",
    message: "Who are your project's contributors?"
  },
  {
    type: "input",
    name: "tests",
    message: "Tests: "
  },
//USING THE .THEN FUNCTION TO 
]).then(function(details) {
  //GRAB THE USERNAME FROM GITHUBS API
  console.log(details.user);
  console.log(details.fileName);

  const fileName = details.fileName;
  const user = details.user;
  const queryUrl = `https://api.github.com/users/` + user;

  //AXIOS GOES HERE
  axios.get(queryUrl).then(function(res) {
    //CHECKING TO MAKE SURE THIS INFORMATION CAN BE SHOWN CORRECTLY
    
    // console.log(res.data.profile picture from git);
    // console.log(res.data.email);
    console.log(res.data.avatar_url);
    console.log(res.data.company);
    // console.log(res.data.user live web portfolio);
    // console.log(res.data.user description);

    // const pic = (res.data.avatar_url);
    // const email = res.data.email;
    const pic = `(${res.data.avatar_url})`;

    // ![GitHub Logo](/images/logo.png)
    // Format: ![Alt Text](url)
    // img format!!!!!!!!!!!!*******************************

    const email = res.data.company;
    const portfolio = res.data.blog;
    const bio = res.data.bio;




    //HOW DO I PUT THE BADGE IN??????
    // const badge = ![badge](https://img.shields.io/github/languages/top/${login}/${#});




    //NOW WE'LL PUT IT TOGETHER BY APPENDING USER INPUTS & API DATA
    fs.appendFile("goodREADME.md", "Title: " + details.title +
      "\n\n\nContents: " + "\n1.Description" + "\n2.Usage" + 
      "\n3.Installation" + "\n4.Author" + "\n5.License" + 
      "\n6.Tests" + "\n7.Contributions" +

      //TABLE OF CONTENTS ABOVE & newREADME.md USER INPUT BELOW

      "\n\n\n\nDescription:\n" + details.desc +
      "\n\nUsage:\n" + details.usage +
      "\n\nInstallation:\n" + details.install +

      //INFORMATION ABOUT THE GITHUB USER STARTS HERE

      "\n\nAuthor: " + details.user + "\n" +
      "![Chosen Github User's Profile Image]" + 
      //THE ABOVE CREATES ALT TEXT FOR THE GENERATING FILE 
      pic + "\n" + "Email Address: " + email + "\n" + 
      "Live Web Portfolio: " + portfolio + "\n" + 
      "Brief Biography: " + bio + 

      //GITHUB USER INFO ENDS HERE

      "\n\nLicense:\n" + details.license + 
      "\n\nTests:\n" + details.tests + 
      "\n\nContributions:\n" + details.contributors ,

      function(err) {
        if (err) throw err;
        console.log('Saved!');
      }
    );

    if (details.fileName.length > 0) {
      fs.rename('goodREADME.md', details.fileName + 'README.md', function (err) {
        if (err) throw err;
        console.log('File Renamed!');
      });
    }

  });
});
  
    


//END OF SCRIPT