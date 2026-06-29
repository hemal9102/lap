const apiUrl = 'http://localhost:5000/api';

async function runTests() {
  console.log('--- STARTING API E2E TESTS ---');
  let laptopId = null;

  try {
    // 1. CREATE LAPTOP (POST)
    console.log('\n[1] Testing POST /admin/laptops...');
    const createRes = await fetch(`${apiUrl}/admin/laptops`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test MacBook Pro 18"',
        brandName: 'Apple',
        categoryName: 'Workstation',
        price: 3999,
        description: 'A monster machine for testing.',
        specifications: { ram: '64GB', cpu: 'M4 Max' }
      })
    });
    const createData = await createRes.json();
    console.log('Create Response:', createData);
    if (!createData.success) throw new Error('Create failed');
    laptopId = createData.data.id;

    // 2. READ ALL LAPTOPS (GET)
    console.log('\n[2] Testing GET /laptops...');
    const getRes = await fetch(`${apiUrl}/laptops`);
    const getData = await getRes.json();
    console.log('Get Response:', { count: getData.count, success: getData.success });
    if (!getData.success || getData.count === 0) throw new Error('Get all failed');

    // 3. READ SINGLE LAPTOP (GET)
    console.log(`\n[3] Testing GET /laptops/${laptopId}...`);
    const getSingleRes = await fetch(`${apiUrl}/laptops/${laptopId}`);
    const getSingleData = await getSingleRes.json();
    console.log('Get Single Response:', getSingleData.data.name);

    // 4. UPDATE LAPTOP (PUT)
    console.log(`\n[4] Testing PUT /admin/laptops/${laptopId}...`);
    const updateRes = await fetch(`${apiUrl}/admin/laptops/${laptopId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ price: 3499 })
    });
    const updateData = await updateRes.json();
    console.log('Update Response:', updateData.data.price);
    if (updateData.data.price !== 3499) throw new Error('Update failed');

    // 5. GET STATS (GET)
    console.log('\n[5] Testing GET /admin/stats...');
    const statsRes = await fetch(`${apiUrl}/admin/stats`);
    const statsData = await statsRes.json();
    console.log('Stats Response:', statsData.data);

    // 6. DELETE LAPTOP (DELETE)
    console.log(`\n[6] Testing DELETE /admin/laptops/${laptopId}...`);
    const deleteRes = await fetch(`${apiUrl}/admin/laptops/${laptopId}`, {
      method: 'DELETE'
    });
    const deleteData = await deleteRes.json();
    console.log('Delete Response:', deleteData);

    console.log('\n--- ✅ ALL TESTS PASSED SUCCESSFULLY! ---');
  } catch (err) {
    console.error('\n--- ❌ TEST FAILED ---');
    console.error(err);
  }
}

runTests();
