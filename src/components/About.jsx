import React from "react";
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";

function App() {
    return (
        <Container>
            <Grid container justifyContent={"center"} rowSpacing={3} mt={2} >
                <Grid item sm={8} textAlign={"center"}>
                    <h1>About Simple Notes</h1>
                </Grid>
                <Grid item sm={8}>
                    <p>
                        My Notes App is a personal project that I developed to showcase my skills as a full-stack web developer.
                        This application allows you to create, edit, and organize your digital notes effortlessly.
                        Whether you want to jot down quick ideas, reminders, or elaborate thoughts, this app has got you covered.
                    </p>
                </Grid>
                <Grid item sm={8}>
                    <h3>Technologies Used:</h3>
                    <p>
                        My Notes App is built using the powerful combination of React and Django.
                        The front-end interface is enhanced with the Material-UI library.
                    </p>
                </Grid>
            </Grid>
        </Container>

    );
}

export default App;