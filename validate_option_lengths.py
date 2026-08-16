import json
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

def analyze_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    m = re.search(r'return\s*(\[\s*\{.*\}\s*\]);?\s*\}', text, re.DOTALL)
    if not m:
        print(f"Error: Could not parse questions from {filepath}")
        return None

    data = json.loads(m.group(1))
    total = len(data)

    rank_en = {0: 0, 1: 0, 2: 0, 3: 0} # 0=longest, 3=shortest
    rank_vi = {0: 0, 1: 0, 2: 0, 3: 0}
    
    domain_rank_en = {}
    
    total_len_corr_en = 0
    total_len_other_en = 0

    for q in data:
        c = q['correct']
        d = q.get('domain', 'Unknown')
        if d not in domain_rank_en:
            domain_rank_en[d] = {0: 0, 1: 0, 2: 0, 3: 0, 'total': 0}
        domain_rank_en[d]['total'] += 1

        # EN
        opts_en = q.get('optionsEN', [])
        if len(opts_en) == 4:
            lens_en = [len(opt) for opt in opts_en]
            sorted_idx_en = sorted(range(4), key=lambda i: lens_en[i], reverse=True)
            r_en = sorted_idx_en.index(c)
            rank_en[r_en] += 1
            domain_rank_en[d][r_en] += 1
            total_len_corr_en += lens_en[c]
            total_len_other_en += sum(lens_en[i] for i in range(4) if i != c) / 3

        # VI
        opts_vi = q.get('options', [])
        if len(opts_vi) == 4:
            lens_vi = [len(opt) for opt in opts_vi]
            sorted_idx_vi = sorted(range(4), key=lambda i: lens_vi[i], reverse=True)
            r_vi = sorted_idx_vi.index(c)
            rank_vi[r_vi] += 1

    print(f"==================================================")
    print(f"ANALYSIS REPORT: {filepath}")
    print(f"Total Questions: {total}")
    print(f"Avg Correct Length (EN): {total_len_corr_en / total:.1f} chars")
    print(f"Avg Distractor Length (EN): {total_len_other_en / total:.1f} chars")
    print(f"Length Ratio (Correct / Distractor): {(total_len_corr_en / total) / (total_len_other_en / total):.2f}x")
    print(f"--------------------------------------------------")
    print(f"English Options Rank Distribution (Rank 1 = Longest):")
    print(f"  Rank 1 (Longest):  {rank_en[0]:3d} ({rank_en[0]/total*100:5.1f}%) {'🚨 HIGH BIAS' if rank_en[0]/total > 0.35 else '✅ BALANCED'}")
    print(f"  Rank 2:            {rank_en[1]:3d} ({rank_en[1]/total*100:5.1f}%)")
    print(f"  Rank 3:            {rank_en[2]:3d} ({rank_en[2]/total*100:5.1f}%)")
    print(f"  Rank 4 (Shortest): {rank_en[3]:3d} ({rank_en[3]/total*100:5.1f}%)")
    print(f"--------------------------------------------------")
    print(f"Vietnamese Options Rank Distribution:")
    print(f"  Rank 1 (Longest):  {rank_vi[0]:3d} ({rank_vi[0]/total*100:5.1f}%)")
    print(f"  Rank 2:            {rank_vi[1]:3d} ({rank_vi[1]/total*100:5.1f}%)")
    print(f"  Rank 3:            {rank_vi[2]:3d} ({rank_vi[2]/total*100:5.1f}%)")
    print(f"  Rank 4 (Shortest): {rank_vi[3]:3d} ({rank_vi[3]/total*100:5.1f}%)")
    print(f"--------------------------------------------------")
    print(f"Domain-by-Domain Rank 1 (Longest) EN:")
    for d in sorted(domain_rank_en.keys()):
        stats = domain_rank_en[d]
        print(f"  {d}: {stats[0]}/{stats['total']} ({stats[0]/stats['total']*100:.1f}%) longest")
    print(f"==================================================\n")
    return rank_en

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else r'website/js/data/mock-exam-data.js'
    analyze_file(target)
