## Inspiration 🌟
In the Architecture, Engineering, and Construction (AEC) domain, professionals often face challenges in streamlining their workflows and obtaining actionable insights from their models. Our inspiration stems from the desire to create a tool that bridges this gap, making it easier for users to analyze their models, get location-specific recommendations, and generate comprehensive reports. By leveraging the power of Speckle and integrating AI-driven insights, we aim to revolutionize how AEC professionals approach their projects, providing them with valuable data at their fingertips.

## What it does 🛠️
Our web application serves as an all-in-one solution for AEC professionals. Users can input their Stream ID, Commit ID, and the location of their structure into the app. Once authenticated, they can view their model embedded directly within the platform. The app calculates the total volume of the structure, providing users with precise data. It gets other parameters as well to understand the design better. Additionally, it offers tailored recommendations on best practices and materials based on the specific location of the project. Users also receive a detailed cost analysis, which aids in budgeting and planning. Finally, the app generates a comprehensive report that users can download, helping them make informed decisions throughout their projects. So, this report provided via BuildSphere could be considered as a starting point for presenting the insights, and it would be really helpful in attaining business intelligence through custom tailored suggestions and action items.

## How we built it 🏗️
1. **Speckle API**: We used the Speckle API to fetch model data, allowing us to retrieve detailed information about the structure. More specifically, we integrated the python library provided by Speckle, called specklepy.
2. **Google Gemini**: This AI tool was integrated to provide intelligent suggestions on materials and best practices, based on the calculated volume and location.
3. **Flask and Python**: Our backend is powered by Flask and Python, handling data processing, API interactions, and ensuring smooth operation of the application.
4. **React**: For the frontend, we chose React to create an interactive and user-friendly interface that enables users to easily input data, view models, and download reports.
5. **Figma**: We used Figma for designing our application.
6. **Railway**: The backend is deployed via railway in a CI/CD manner. So after each commit, it gets deployed automatically by fetching the code from our git repository.
## Challenges we ran into 🚧
1. **API Integration**: Integrating multiple APIs, especially ensuring that data flows seamlessly between Speckle and Google Gemini, was a complex task.
2. **Volume Calculation**: Accurately calculating the volume of complex 3D models presented technical challenges that required advanced algorithms. It is also a sort of limitation right now since it doesn't account for overlapping meshes, which could lead to wrong volume calculations.
3. **Secure Authentication**: Implementing a secure authentication mechanism and understanding how its working took us a bit of time. But, we eventually figured it out!
4. **User Experience**: Ensuring that the app provides a smooth and responsive experience, even when handling multiple things, was a significant challenge.

## Accomplishments that we're proud of 🏆
We are proud to have successfully integrated Speckle and Google Gemini, creating a powerful tool that offers valuable insights to AEC professionals. The user-friendly interface we developed simplifies complex tasks, making it accessible to users with varying levels of technical expertise. Our secure authentication process ensures that user data is protected, and the comprehensive reporting feature we implemented provides detailed, actionable information that users can rely on.

## What we learned 📚
Throughout this project, we learned the importance of seamless API integration and efficient data flow. We delved into advanced techniques for handling 3D models and calculating volumes accurately. Enhancing the user experience through an interactive and responsive design was another key learning point. Additionally, we gained valuable insights into leveraging AI to provide practical recommendations and suggestions tailored to user needs. We learned a lot about the AEC domain and the impact Speckle puts into it, as it was our first time working on something related to this domain.

## What's next for BuildSphere 🚀
Looking ahead, we plan to add more advanced analytical features and insights to our platform. We aim to integrate additional AI models to refine the suggestions provided to users further. Expanding the reporting capabilities to include more detailed analyses is also on our roadmap. We will continue to enhance the UI/UX based on user feedback to ensure an optimal experience. Additionally, we are exploring partnerships with material suppliers to provide real-time cost updates, further aiding users in their project planning and execution. We also actively aim to remove the limitations that the app has currently, and make it better for usage.


## Setting Up Project Locally
- Get your Gemini API Keys and Speckle Access Token.
- Clone the repository ```git clone https://github.com/shrutixyz/buildsphere```
- ```cd backend & pip install -r requirements.txt & flask run```
- ```cd frontend & npm i & npm start```
- Make sure the URLs and API keys are set and configured properly.
