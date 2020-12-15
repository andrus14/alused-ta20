const part1Answer = document.querySelector('#part-1-answer')
const part2Answer = document.querySelector('#part-2-answer')
let passports = [];
let part1Counter = 0;
let part2Counter = 0;
// const valid_passport = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];


fetch('day4.txt')
.then(response => response.text())
.then(data => {
    const splitted = data.split('\n\n');

    splitted.forEach(el => {
        let passport = {};
        el.split(/\s+/).forEach(parameter => {
            const pairs = parameter.split(':');
            passport[pairs[0]] = pairs[1];

        });
        if ( 'byr' in passport && 'iyr' in passport && 'eyr' in passport && 'hgt' in passport && 'hcl' in passport && 'ecl' in passport && 'pid' in passport ) {
            
            // Part 1
            part1Counter++;
            
            // Part 2
            let isValid = true;

            // byr (Birth Year) - four digits; at least 1920 and at most 2002.
            if ( !(parseInt(passport['byr']) >= 1920 && parseInt(passport['byr']) <= 2002) ) {
                isValid = false;
            }

            // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
            if ( !(parseInt(passport['iyr']) >= 2010 && parseInt(passport['iyr']) <= 2020) ) {
                isValid = false;
            }

            // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
            if ( !(parseInt(passport['eyr']) >= 2020 && parseInt(passport['eyr']) <= 2030) ) {
                isValid = false;
            }

            // hgt (Height) - a number followed by either cm or in:
            // If cm, the number must be at least 150 and at most 193.
            // If in, the number must be at least 59 and at most 76.
            const hgtStr = passport['hgt']
            const unit = hgtStr.substring(hgtStr.length - 2, hgtStr.length)
            const hgt = parseInt(hgtStr.substring(0, hgtStr.length - 2))
            
            if ( !(unit == 'cm' && hgt >= 150 && hgt <= 193 || unit == 'in' && hgt >= 59 && hgt <= 76) ) {
                isValid = false;
            }
            
            // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
            if ( ! passport['hcl'].match(/^#[0-9a-f]{6,6}$/i) ) {
                isValid = false;
            }

            // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
            if ( ! ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport['ecl']) ) {
                isValid = false;
            }

            // pid (Passport ID) - a nine-digit number, including leading zeroes.
            if ( ! passport['pid'].match(/^[0-9]{9,9}$/i) ) {
                isValid = false;
            }

            // cid (Country ID) - ignored, missing or not.

            if ( isValid ) {
                part2Counter++;
            }

        }
        // passports.push(passport);
    });

    console.log(part1Counter);
    console.log(part2Counter);
    part1Answer.innerText = part1Counter;
    part2Answer.innerText = part2Counter;
});

