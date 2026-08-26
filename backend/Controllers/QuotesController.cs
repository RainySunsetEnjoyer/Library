using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace backend.Controllers;

[ApiController]
[Authorize]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
    {
        var userId = int.Parse(
    User.FindFirstValue(ClaimTypes.NameIdentifier)!
);

        return await _context.Quotes
            .Where(q => q.UserId == userId)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Quote>> GetQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);

        if (quote == null)
        {
            return NotFound();
        }

        return quote;
    }

    [HttpPost]
    public async Task<ActionResult<Quote>> CreateQuote(
    CreateQuoteRequest request)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var quoteCount = await _context.Quotes
            .CountAsync(q => q.UserId == userId);

        if (quoteCount >= 5)
        {
            return BadRequest("Du kan endast ha upp till 5 citat.");
        }

        var quote = new Quote
        {
            Text = request.Text,
            UserId = userId
        };

        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetQuote),
            new { id = quote.Id },
            quote
        );
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(
    int id,
    UpdateQuoteRequest request)
    {
        var userId = int.Parse(
            User.FindFirstValue(ClaimTypes.NameIdentifier)!
        );

        var quote = await _context.Quotes
            .FirstOrDefaultAsync(q =>
                q.Id == id &&
                q.UserId == userId);

        if (quote == null)
        {
            return NotFound();
        }

        quote.Text = request.Text;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null)
        {
            return NotFound();
        }

        _context.Quotes.Remove(quote);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool QuoteExists(int id)
    {
        return _context.Quotes.Any(e => e.Id == id);
    }
}