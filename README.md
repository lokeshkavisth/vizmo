# Vizmo Video Conferencing Platform

A modern, real-time video conferencing application built with Next.js, LiveKit, and Convex. This platform allows users to create and join virtual meeting rooms with high-quality video and audio capabilities.

## Features

- **Real-time Video & Audio Communication**: Connect with multiple participants in high-quality video calls
- **User Authentication**: Secure user authentication powered by Clerk
- **Meeting Rooms**: Create and join persistent meeting rooms
- **Media Controls**: Toggle camera, microphone, and screen sharing
- **Device Selection**: Choose between different cameras, microphones, and speakers
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Video SDK**: LiveKit
- **Backend/Database**: Convex
- **Authentication**: Clerk
- **UI Components**: Tailwind CSS, Shadcn UI
- **Toast Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- A LiveKit account and project
- A Clerk account and project
- A Convex account and project

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# LiveKit
NEXT_PUBLIC_LIVEKIT_URL=your_livekit_url
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url
```

### Installation

1. Clone the repository

   ```
   git clone https://github.com/lokeshkavisth/vizmo.git
   cd vizmo
   ```

2. Install dependencies

   ```
   npm install

   ```

3. Start the development server

   ```
   npm run dev

   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating a Meeting Room

1. Sign in to your account
2. Navigate to the dashboard
3. Click "Create New Room"
4. Share the room link with participants

### Joining a Meeting

1. Click on a room link or enter a room ID
2. Grant camera and microphone permissions when prompted
3. Join the meeting

### During a Meeting

- Use the control bar at the bottom to toggle your camera, microphone, and screen sharing
- Click the device menu to select different input/output devices
- Leave the meeting by clicking the disconnect button

## Troubleshooting

### Video or Audio Issues

- Ensure your browser has permission to access your camera and microphone
- Check that you have selected the correct devices in the media device menu
- Make sure no other applications are using your camera or microphone

### Connection Issues

- Check your internet connection
- Ensure your LiveKit server is running correctly
- Verify that your token generation is working properly

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

- [LiveKit](https://livekit.io/) for the real-time communication SDK
- [Convex](https://www.convex.dev/) for the backend infrastructure
- [Clerk](https://clerk.dev/) for authentication services
- [Next.js](https://nextjs.org/) for the React framework
