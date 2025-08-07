using System;
using System.Linq;

// =============================================================================
// OBJECT-ORIENTED & FUNCTIONAL
// OBJECT-ORIENTED: State is separated in units
// FUNCTIONAL: No state mutations
// =============================================================================

public record CalculationResult(int Sum, int EvenCount)
{
    public static CalculationResult Empty => new(0, 0);
    
    // Functional method: returns new instance, doesn't modify this
    public CalculationResult Add(int number)
    {
        return new CalculationResult(
            Sum + number,
            number % 2 == 0 ? EvenCount + 1 : EvenCount
        );
    }
    
    // Functional composition: chain operations
    public CalculationResult ProcessNumbers(int[] numbers)
    {
        return numbers.Aggregate(this, (result, num) => result.Add(num));
    }
}

class Program
{
    static void Main()
    {
        int[] numbers = { 1, 2, 3, 4, 5 };
        
        // Immutable approach: create new instances
        var result = CalculationResult.Empty.ProcessNumbers(numbers);
        
        Console.WriteLine($"Sum: {result.Sum}, Even count: {result.EvenCount}");
    }
}
