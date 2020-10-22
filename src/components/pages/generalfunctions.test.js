// Required packages for testing
import React from "react";
import { MemoryRouter } from "react-router-dom";
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow } from 'enzyme';
import Enzyme from 'enzyme';

// Components to be tested
import SearchResultPage from "./SearchResultPage.js";
import SearchFilter from "../search-result-components/SearchFilters";
import ScrollToTop from "../general-components/ScrollToTop";
Enzyme.configure({ adapter: new Adapter() });


// General functions unit test
test("Search result always return something (even without input)", () => {
  const wrapper = shallow(<SearchResultPage />);
  expect(wrapper.state('searchResults')).not.toBeNull();
});

test("Search filter always contain data", () => {
  const wrapper = shallow(<SearchFilter />);
  expect(wrapper.state('methodologies')).not.toBeNull();
  expect(wrapper.state('methods')).not.toBeNull();
  expect(wrapper.state('researchMethods')).not.toBeNull();
  expect(wrapper.state('researchParticipants')).not.toBeNull();
});


//Testing if scrolltotop works as intended and is called when page reloads/changes
global.scrollTo = jest.fn();  
describe('ScrollToTop', () => {
  let wrapper;
  let history;
  beforeEach(() => {
    wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop>
          <p>Hi</p>
        </ScrollToTop>
      </MemoryRouter>
    );
    history = wrapper.instance().history;
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Calls window.scrollTo when route changes', () => {
    expect(global.scrollTo).not.toHaveBeenCalled();
    history.push('/home');
    expect(global.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('ScrollToTop renders children', () => {
    const component = wrapper.find(ScrollToTop);
    expect(component.children().length).toEqual(1);
    expect(component.contains(<p>Hi</p>)).toEqual(true);
  });
});


