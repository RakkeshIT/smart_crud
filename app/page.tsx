'use client'
import * as React from 'react';
import { Container, Box } from '@mui/material';
import TextPressure from '../components/TextPressure';
import { RainbowButton } from '../components/ui/rainbow-button';
export default function SignInCard() {

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          background: "linear-gradient(to right top, #7604f2, #6608f0, #550bef, #3e0fed, #1b12eb)",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Container maxWidth="md"
           sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
        >
       <TextPressure
              text="Welcome to SmartCRUD!"
              flex={true}
              alpha={false}
              stroke={false}
              width={true}
              weight={true}
              italic={true}
              textColor="#ffffff"
              strokeColor="#ff0000"
              minFontSize={30}
            />

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
            <RainbowButton className="mt-8 px-8" href="/login">
            Login
          </RainbowButton>

          <RainbowButton className="mt-8 px-8" href="/register">
            Create Your Account
          </RainbowButton>
          </Box>
        </Container>
      </Box>
    </>
  );
}
