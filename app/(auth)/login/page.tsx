import { SignIn } from "@clerk/nextjs";
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
        <SignIn signUpUrl="/register" fallbackRedirectUrl='/client/create-task'/>
      </Container>
    </Box>
  );
}
