# f = open('example.txt')
f = open('input.txt')
lines = f.readlines()

bags = set()

def count_colors ( color ):

    for l in lines:
        splitted = l.split(' bags contain ')
        if splitted[1].count(color):
            bags.add(splitted[0])
            count_colors(splitted[0])

def count_bags ( color ):

    bc = 0

    for l in lines:
        splitted_line = l.split(' bags contain ')
        if splitted_line[0] == color:
            contain_bags = splitted_line[1].split(', ')
            for_bc = 0
            for b in contain_bags:
                if not 'no other bags' in b:
                    words = b.split()
                    c = int(words[0])
                    new_color = words[1] + ' ' + words[2]
                    for_bc = c + c * count_bags(new_color)
                bc += for_bc
            return bc

count_colors('shiny gold')
count = count_bags('shiny gold')

print('Part 1:', len(bags))
print('Part 2:', count)

# print(lines)