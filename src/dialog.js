// This is the definition of our Dialog
// TODO: Rather than asking the user to fill in their name,
// can you determine their name programatically?
// Give https://api.slack.com/methods/users.info
const axios = require('axios');
const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_TOKEN;
// set up Axios
axios.defaults.baseURL = 'https://slack.com';
axios.defaults.headers.common['Authorization'] = `Bearer ${SLACK_OAUTH_TOKEN}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';


module.exports = (triggerId, userId) => {
  let userInfo;
  axios.get('https://slack.com/api/users.info', {user: userId})
  .then(function(res){
       userInfo = res.user.profile.real_name;   
  })
  .catch(function(error) {
    console.log(error);
  });

  const form = {
    trigger_id: triggerId,
    dialog: JSON.stringify({
      title: 'Welcome!',
      callback_id: 'welcome',
      submit_label: 'Submit',
      elements: [
        {
          label: 'Full name',
          type: 'text',
          name: userInfo,
          hint: 'First and last name, please',
        },
        {
          label: 'Fun fact about yourself',
          type: 'textarea',
          name: 'fun-fact',
          hint: 'Tell us something no one knows!',
        },
        {
          label: 'T-shirt size',
          type: 'select',
          name: 'shirt-size',
          options: [
            { label: 'Small', value: 'small' },
            { label: 'Medium', value: 'medium' },
            { label: 'Large', value: 'large' },
          ],
          hint: 'Everybody loves a free t-shirt!',
        },
      ],
    }),
  };

  return form;
};
