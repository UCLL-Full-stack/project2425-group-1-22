import Head from 'next/head';
import {
    Container,
    Typography,
    Box,
    AppBar,
    Toolbar,
    Card,
    CardContent,
    Button,
} from '@mui/material';
import Header from '@/components/Header';
import withAuth from '@/util/withAuth';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import RequirementTable from '@/components/requirementTable';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import noToken from '@/util/noToken';

type DecodedToken = {
    role: string;
};

const Home: React.FC = () => {
    const [role, setRole] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode<DecodedToken>(token);
        setRole(decodedToken.role);
    }, []);

    return (
        <>
            <Header />

            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Welcome to Travelblog!
                </Typography>
                <Typography variant="body1" align="center" color="textSecondary" paragraph>
                    Travelblog is a community platform where travelers can record memories, share
                    experiences, and get inspiration for future trips. Connect with others based on
                    location or activities and keep your travel ideas organized.
                </Typography>

                <Box display="flex" flexDirection="column" gap={3} mt={4}>
                    {(role == "guest") && (
                        <Link href="/user/login">
                            <Button color="inherit">
                                <Card>
                                    <CardContent>
                                        <Typography variant="h5">
                                            Register and Create Your Profile
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Sign up to join the community. Create a personal profile
                                            to track your journeys and share with others. Customize
                                            your profile with a photo and bio to make it uniquely
                                            yours.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Button>
                        </Link>
                    )}

                    <Link href="/feed">
                        <Button color="inherit">
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">Discover & Connect</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Find travel posts by location or activity, like city tours
                                        or hiking spots. Comment on posts and save ideas for your
                                        future trips. Explore an interactive map of user posts to
                                        see where others have been and connect with fellow
                                        travelers.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Button>
                    </Link>

                    <Link href="/user/posts/createPost">
                        <Button color="inherit">
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">
                                        Post Your Travel Experiences
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Record your travel memories with detailed posts. Add a
                                        title, description, geolocation, photos, and tags to each
                                        post to capture the essence of your journey and inspire
                                        others.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Button>
                    </Link>

                    <Link href="/user/planners/createPlanner">
                        <Button color="inherit">
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">
                                        Plan Your Future Adventures
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Organize upcoming trips with a personalized travel planner.
                                        Add destinations, set itineraries, and manage travel details
                                        in one place.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Button>
                    </Link>
                </Box>

                <RequirementTable/>
            </Container>
        </>
    );
};

export default noToken(Home);