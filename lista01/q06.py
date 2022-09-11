def get_division(dividend, divisor):
    result = int(dividend / divisor)
    rest = dividend % divisor
    return result, rest


def from_decimal(number, base):
    converted = ""

    division_result = number

    if number < base:
        rest = number

    while division_result >= base:
        division_result, rest = get_division(division_result, base)
        converted = str(rest) + converted
        if division_result < base:
            rest = division_result

    converted = str(rest) + converted
    return converted


def to_decimal(number, base):
    reversed = str(number)[::-1]
    result = 0

    for idx, digit in enumerate(reversed):
        digit = int(digit)
        if digit >= base:
            raise Exception("Invalid number")
        result += digit * pow(base, idx)

    return result


if __name__ == "__main__":
    number, base_from, base_to = input(
        "Enter the number, its base and the desired base (separated by space): "
    ).split(" ")

    base_from = int(base_from)
    base_to = int(base_to)
    number = int(number)

    if base_from <= 1 or base_to <= 1:
        raise Exception("Base must be greater than one")

    if number < 0:
        raise Exception("Number must be greated than zero")

    if base_to == 10:
        print(to_decimal(number, base_from))
    elif base_from == 10:
        print(from_decimal(number, base_to))
    else:
        decimal = to_decimal(number, base_from)
        print(from_decimal(decimal, base_to))
