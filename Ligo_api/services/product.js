const db = require('./db');
const helper = require('./helper');
const config = require('./config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT project_id, category_id, product_name, product_color, product_quantity,product_description 
    FROM ligo_product LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};
  return {
    data,
    meta
  }
}

async function create(product){
  const result = await db.query(`INSERT INTO ligo_product(category_id,product_name,product_color,product_quantity,product_description) 
    VALUES('${product.category_id}',' ${product.product_name}', '${product.product_color}', '${product.product_quantity}', '${product.product_description}')`
    );
  let message = 'Error in creating product ';
  if(result.affectedRows) {
    message = 'product created successfully';
  }
  return {message};
}

async function update(id, product){
  const result = await db.query(
    `UPDATE ligo_product 
    SET product_name="${product.product_name}", product_color=${product.product_color}, product_quantity=${product.product_quantity}product_description=${product.product_description}
    WHERE product_id=${id}` 
  );

  let message = 'Error in updating product';

  if (result.affectedRows) {
    message = 'product updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM ligo_product WHERE id=${id}`
  );

  let message = 'Error in deleting project';

  if (result.affectedRows) {
    message = 'project deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update
}