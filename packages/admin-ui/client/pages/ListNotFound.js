import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Nav from '../components/Nav';
import { Page } from '@keystonejs/ui/src/primitives/layout';
import { Title } from '@keystonejs/ui/src/primitives/typography';

const ListNotFoundPage = ({ listKey }) => (
  <Fragment>
    <Nav />
    <Page>
      <Title>Invalid List.</Title>
      <p>The list {listKey} hasn't been defined.</p>
      <Link to="/admin">Go Home</Link>
    </Page>
  </Fragment>
);

export default ListNotFoundPage;
