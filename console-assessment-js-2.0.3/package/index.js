/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (properties, items) => {
  // Map through each item and remove specified properties
  return items.map(item => {
      const newItem = { ...item };
      properties.forEach(property => delete newItem[property]);
      return newItem;
  });
};
  
exports.excludeByProperty = (property, items) => {
  // Check item if given property does not exist, return if true
  return items.filter(item => !(property in item));
};

  
exports.sumDeep = (arr) => {
  return arr.map(item => ({
    // Compute the sum using reduce
    objects: item.objects.reduce((total, obj) => total + obj.val, 0)
  }));
};


exports.applyStatusColor = (colorCodes, statusCodes) => {
  const statusColorArray = statusCodes
  .map(statusObj => {
    // Find the color associated with the status code in the colorCodes object
    const color = Object.keys(colorCodes).find(color => colorCodes[color].includes(statusObj.status));
    return {
      status: statusObj.status,
      color: color
    };
  })
  .filter(statusObj => statusObj.color); // FIlter object with undefined color
  return statusColorArray;
};


// Based on the test this function takes a generic 'greet' function and a specific 'greeting' string
exports.createGreeting = (greet, greeting) => {
  // It returns a new function that takes a 'name' parameter
  return (name) => {
      // Inside the new function, it calls the provided 'greet' function
      // with the 'greeting' string and the 'name' parameter
      return greet(greeting, name);
  };
};


exports.setDefaults = (defaults) => (object) => {
  Object.entries(defaults).forEach(([key, value]) => {
      object[key] = (key in object) ? object[key] : value;
  });
  return object;
};

exports.fetchUserByNameAndUsersCompany = async (name, services) => {
  // Find the user with the specified name, if not found, throw an error
  const user = (await services.fetchUsers()).find(u => u.name === name) || 
               (() => { throw new Error(`User with name '${name}' not found`); })();
  
  // Fetch the company details for the found user, if company not found, throw an error
  const company = (await services.fetchCompanyById(user.companyId)) || 
                  (() => { throw new Error(`Company not found for user '${name}'`); })();

  // Return an object containing the user, company, and status fetched using services
  return { user, company, status: await services.fetchStatus() };
}; 

