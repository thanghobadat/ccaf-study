import re
from collections import Counter

with open(r'd:\AI\CCAF\website\js\data\mock-exam-data.js', encoding='utf-8') as f:
    code = f.read()

ids = re.findall(r'"id":\s*"([^"]+)"', code)
domains = re.findall(r'"domain":\s*"(D\d)"', code)
corrects = re.findall(r'"correct":\s*(\d)', code)
rationales = re.findall(r'"rationale":\s*"([^"]+)"', code)

print(f"Total questions: {len(ids)}")
print(f"IDs: {ids}")
print(f"Domains: {domains}")
print(f"Correct dist: {dict(Counter(int(c) for c in corrects))}")
print(f"All rationale unique: {len(set(rationales)) == len(rationales)}")

bad_generic = len(re.findall(r'Phuong an khong toi uu|kh\xf4ng t\u1ed1i \u01b0u', code))
print(f"Generic explanations (Phuong an khong toi uu): {bad_generic} (should be 0)")

has_crosscontam = re.findall(r'"question":\s*"\[d', code)
print(f"Questions with ID prefix in VI field: {len(has_crosscontam)}")

print("\nVALIDATION SUMMARY:")
print(f"  Count OK: {len(ids) == 10}")
print(f"  5 domains covered: {len(set(domains)) == 5}")
print(f"  Answer spread: {dict(Counter(int(c) for c in corrects))}")
