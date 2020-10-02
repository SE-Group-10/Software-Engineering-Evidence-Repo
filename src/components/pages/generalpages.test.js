// Required packages for testing
import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

// Components to be tested
import HomePage from './HomePage.js';
import LoginPage from './LoginPage.js';
import SearchPage from './SearchPage.js';
import SearchResultPage from './SearchResultPage.js';
import SignUpPage from './SignUpPage.js';



// Snapshot tests for UI testing.
test('Home Page Renders properly', () => {
    const tree = renderer.create(<Router><HomePage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Login Page Renders properly', () => {
    const tree = renderer.create(<Router><LoginPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Search Page Renders properly', () => {
    const tree = renderer.create(<Router><SearchPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Search Result Page Renders properly', () => {
    const tree = renderer.create(<Router><SearchResultPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Sign Up Renders properly', () => {
    const tree = renderer.create(<Router><SignUpPage /></Router>).toJSON();
    expect(tree).toMatchSnapshot();
});



