import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://instagram29.p.rapidapi.com/user/kingjames/media',
  headers: {
    'X-RapidAPI-Key': '4052cfa411msh2b7caba6b20f9dap1ea9aejsnb47f6e10305a',
    'X-RapidAPI-Host': 'instagram29.p.rapidapi.com'
  }
};
const token = "IGQVJXcGYwclFTYlNvQlRSUEFobG1QYkRLVTVfYVRoRDNJOUZAWaEI2T053ZA3BETk1PZA01tT3kyOVVwSEc1c2ZAfYk04eWZAXeExlZAUw3MGZAKWTNscEo3a2l0ejRLaE95WXJzQlgwRHBxNUQ4eEJDdllYbS1wSlIyT1A4R0ZAr"
const user_id = "17841412419838646"

export default function InstagramAPI() {
    axios.get('https://api.instagram.com/v1/users/' + user_id + '/media/recent',{
        dataType: 'jsonp',
        data:{access_token: token,count:5}
    }).then(function (response) {
        console.log(response);
    }
    ).catch(function (error) {  console.log(error); }
    );
  return (
    <div>
      <h1>InstagramAPI</h1>
    </div>
  );
}