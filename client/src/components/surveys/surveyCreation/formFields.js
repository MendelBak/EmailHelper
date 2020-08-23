// Contains an array of objects which determine the From Field properties. 

// Capital spellings of the var name indicates that this (a const) should not be changed, and is immutable.
const FIELDS = [
  { label: 'Survey Title', name: 'title', noValueError: 'Please add a title' },
  {
    label: 'Survey Subject',
    name: 'subject',
    noValueError: 'Please add a subject',
  },
  {
    label: 'Email Body',
    name: 'body',
    noValueError: 'Please add some body text',
  },
  {
    label: 'Recipient List',
    name: 'recipients',
    noValueError: 'Please add a comma-separated list of recipient emails',
  },
];

export default FIELDS;