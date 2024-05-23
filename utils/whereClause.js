//base  - Product.find()
// base - Product.find(email: {abc@gmail.com})

//bigQ - //search=coder&page=2&category=shortsleeves&rating[gte]=4
// &price[lte]=999&price[gte]=199&limit=5

//bigQ is a object having keys with values
class whereClause {
  constructor(base, bigQ) {
    this.base = base;
    this.bigQ = bigQ;
  }
  search() {
    const searchword = this.bigQ.search
      ? {
          name: {
            $regex: this.bigQ.search, //If there's a search query, it constructs a MongoDB-style query object using the $regex operator,search on the name field.
            $options: "i", //i case insensitivity g for global
          },
        }
      : {};
    this.base = this.base.find({ ...searchword });
    return this;
  }

  pager(resultperPage) {
    let currentPage = 1;
    if (this.bigQ.page) {
      currentPage = this.bigQ.page;
    }

    let skipval = resultperPage * (currentPage - 1);

    this.base = this.base.limit(resultperPage).skip(skipval);

    return this;
  }
  filter() {
    const copybigQ = this.bigQ; // to avoid directly modifying the original bigQ object

    //deleting fields which are not used for filtering
    delete copybigQ["search"];
    delete copybigQ["page"];
    delete copybigQ["limit"];

    let strCopybigQ = JSON.stringify(copybigQ); //converting object into a string

    //replacing gte and lte with $gte and $lte syntax of mongodb
    strCopybigQ = strCopybigQ.replace(/\b(gte|lte)\b/g, (m) => `$${m}`);

    const jsonCopybigQ = JSON.parse(strCopybigQ); //parsed back into a JSON objec
    this.base = this.base.find(jsonCopybigQ); // the filter conditions are applied interacting with a MongoDB database.
    return this;
}
}

module.exports = whereClause;
