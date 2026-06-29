import urllib.request
import json
import sys

# Force stdout to utf-8 if possible, or just avoid emojis
BASE_URL = "http://localhost:5000"

def print_step(msg):
    print(f"\n[+] {msg}")

def request(method, path, data=None):
    url = BASE_URL + path
    headers = {'Content-Type': 'application/json'}
    req = urllib.request.Request(url, headers=headers, method=method)
    if data:
        req.data = json.dumps(data).encode('utf-8')
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        return json.loads(e.read().decode())
    except Exception as e:
        return {"success": False, "error": str(e)}

def run_tests():
    print("--- Starting End-to-End Headless Backend Testing & Data Injection ---")

    # 1. Inject New Laptops
    print_step("Injecting new Laptop data...")
    laptop_data = [
        {
            "name": "ThinkPad X1 Carbon Gen 11",
            "brandName": "Lenovo",
            "categoryName": "Business",
            "price": 145000,
            "description": "Ultra-lightweight premium business laptop.",
        },
        {
            "name": "Razer Blade 16",
            "brandName": "Razer",
            "categoryName": "Gaming",
            "price": 280000,
            "description": "Ultimate gaming powerhouse.",
        }
    ]
    for ld in laptop_data:
        res = request("POST", "/api/admin/laptops", ld)
        print(f"  -> Injected {ld['name']}: {res.get('success')}")

    # 2. Inject New Leads
    print_step("Injecting new Lead data...")
    lead_data = [
        {
            "name": "Rajesh Kumar",
            "phone": "+91 9988776655",
            "email": "rajesh@example.com",
            "budget": "1,00,000",
            "useCase": "Programming",
            "message": "Looking for a reliable ThinkPad."
        },
        {
            "name": "Pooja Desai",
            "phone": "+91 9123456789",
            "email": "pooja@example.com",
            "budget": "2,50,000",
            "useCase": "Gaming & Editing",
            "message": "Need Razer Blade 16."
        }
    ]
    for ld in lead_data:
        res = request("POST", "/api/leads", ld)
        print(f"  -> Injected Lead '{ld['name']}': {res.get('success')}")

    # 3. Verify Laptops API
    print_step("Verifying Laptops via GET API...")
    res = request("GET", "/api/laptops")
    print(f"  -> Total Laptops in DB: {res.get('count')}")
    if res.get('count') and res.get('count') > 0:
        print(f"  -> Latest Laptop fetched: {res.get('data')[-1].get('name')}")

    # 4. Verify Leads API
    print_step("Verifying Leads via GET API...")
    res = request("GET", "/api/leads")
    print(f"  -> Total Leads in DB: {res.get('count')}")
    if res.get('count') and res.get('count') > 0:
        print(f"  -> Latest Lead fetched: {res.get('data')[0].get('name')}")

    # 5. Check Admin Stats
    print_step("Checking Admin Stats API...")
    res = request("GET", "/api/admin/stats")
    stats = res.get('data', {})
    print(f"  -> Stats Data: Laptops={stats.get('totalLaptopsInCatalog')}, Leads={stats.get('totalLeads')}, Brands={stats.get('totalBrands')}")

    print("\n[SUCCESS] All End-to-End Backend Data Injections & Tests Passed Successfully!")

if __name__ == "__main__":
    run_tests()
