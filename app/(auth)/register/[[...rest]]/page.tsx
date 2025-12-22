import { SignUp } from "@clerk/nextjs";
import { Box, Container } from "@mui/material";

export default function SignUpPage() {
  return (
    <Box
    
    >
      <Container
        sx={{
        height: "120vh",
        display: "grid",
        placeItems: "center",
      }}
      >
        <SignUp signInUrl="/login" fallbackRedirectUrl='/client/create-task' />
      </Container>
    </Box>
  );
}
