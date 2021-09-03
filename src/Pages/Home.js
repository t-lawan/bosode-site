import * as React from "react";

import styled from "styled-components";
import Layout from "../Components/Layout/Layout";
import VideoPlayerSketch from "../Components/Sketches/VideoPlayerSketch";


const HomeWrapper = styled.div`
`;

const Home = () => {
    return (
      <Layout>
        <HomeWrapper>
            <VideoPlayerSketch />
        </HomeWrapper>
      </Layout>
    );
  };
  
  export default Home;
  