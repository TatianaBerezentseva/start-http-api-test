const booksConstants = {
    firstBook: {
      isbn: "9781449325862",
      title: "Git Pocket Guide",
      subTitle: "A Working Introduction",
      author: "Richard E. Silverman",
      publish_date: "2020-06-04T08:48:39.000Z",
      publisher: "O'Reilly Media",
      pages: 234,
      description:
        "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
      website: "http://chimera.labs.oreilly.com/books/1230000000561/index.html",
    },
  
    secondBook: {
      isbn: "9781449331818",
    },
  
    fakeIsbn: "178144932586t",
  
    bookErrorMessage: {
      code: "1205",
      message: "ISBN supplied is not available in Books Collection!",
    },
  
    bookDuplicateErrorMessage: {
      code: "1210",
      message: "ISBN already present in the User's Collection!",
    },
  };
  export default booksConstants;
  