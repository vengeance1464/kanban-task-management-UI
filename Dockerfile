# Use the official Windows Server Core base image
FROM node:20

# Set environment variables for Node.js version
# ENV NODE_VERSION 14.17.0

# Layer: Download and install Node.js
#RUN powershell -Command `Invoke-WebRequest https://nodejs.org/dist/v$env:NODE_VERSION/node-v$env:NODE_VERSION-x64.msi -OutFile nodejs.msi; `Start-Process msiexec.exe -ArgumentList '/i nodejs.msi /quiet' -NoNewWindow -Wait; `Remove-Item -Force nodejs.msi

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .


# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]