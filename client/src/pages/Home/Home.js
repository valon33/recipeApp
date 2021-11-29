import React from "react";
import MainLayout from "../../layouts/MainLayout";
import Card from "../../components/Card/Card";
import PageTitle from "../../components/PageTitle/PageTitle";
import Modal from "../../components/Modal/Modal";

const Home = () => {
  return (
    <MainLayout>
      <Modal />
      <PageTitle description="Fresh & New" />
      <Card />
      <Card />
      <PageTitle description="Most Popular Recipes" />
      <Card />
    </MainLayout>
  );
};

export default Home;
