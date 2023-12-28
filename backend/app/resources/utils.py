from typing import Dict
from dto_models.pagination import Pagination

def pagination_headers(paggination: Pagination) -> Dict[str, str]:
    return {
        'ACCESS-CONTROL-EXPOSE-HEADERS': 'X-PAGINATION-COUNT, X-PAGINATION-LAST-EVALUATED-KEY',
        'X-PAGINATION-COUNT' : paggination.count,
        'X-PAGINATION-LAST-EVALUATED-KEY': paggination.last_evaluated_key if paggination.last_evaluated_key else None
    }