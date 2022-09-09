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


if __name__ == "__main__":
    base, number = input("Enter the base and number (separated by space): ").split(" ")

    base = int(base)
    number = int(number)

    if base <= 1:
        raise Exception("Base must be greater than one")

    if number < 0:
        raise Exception("Number must be greated than zero")

    print(from_decimal(number, base))
